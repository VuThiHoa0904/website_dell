# Copyright 2019 Tecnativa - Sergio Teruel
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo.addons.website_sale.controllers.main import WebsiteSale
import logging
import werkzeug
from odoo import http, _
from odoo.addons.auth_signup.controllers.main import AuthSignupHome
from odoo.addons.auth_signup.models.res_users import SignupError
from odoo.exceptions import UserError
from odoo.http import request
from collections import OrderedDict

_logger = logging.getLogger(__name__)

class ProductAttributeCategory(WebsiteSale):
    @http.route()
    def shop(self, page=0, category=None, search="", ppg=False, **post):
        response = super(ProductAttributeCategory, self).shop(
            page=page, category=category, search=search, ppg=ppg, **post
        )
        # Re-order attributes by their category sequence
        response.qcontext["attributes"] = response.qcontext["attributes"].sorted(
            lambda x: (x.category_id.sequence, x.id)
        )
        # Load all categories, and load a "False" category for attributes that
        # has not category and display it under 'Undefined' category
        categories = [(False, _("Undefined"), True)]
        categories.extend(
            (x.id, x.name, x.website_folded)
            for x in response.qcontext["attributes"].mapped("category_id")
        )
        response.qcontext["attribute_categories"] = categories
        response.qcontext["filtered_products"] = False
        if search or post.get("attrib", False):
            response.qcontext["filtered_products"] = True
        return response

class AuthSignupHome(AuthSignupHome):
    def do_signup(self, qcontext):
        """ Shared helper that creates a res.partner out of a token """
        values = {key: qcontext.get(key) for key in ('login', 'name', 'password', 'phone', 'street', 'street2',
                                                     'zip', 'city_id', 'state_id', 'country_id')}
        # print(values)
        values.update({'country_id': int(qcontext.get('country_id'))})
        if not values:
            raise UserError(_("The form was not properly filled in."))
        if values.get('password') != qcontext.get('confirm_password'):
            raise UserError(_("Passwords do not match; please retype them."))
        supported_lang_codes = [code for code, _ in request.env['res.lang'].get_installed()]
        lang = request.context.get('lang', '').split('_')[0]
        if lang in supported_lang_codes:
            values['lang'] = lang
        self._signup_with_values(qcontext.get('token'), values)
        request.env.cr.commit()

    @http.route('/web/signup', type='http', auth='public', website=True, sitemap=False)
    def web_auth_signup(self, *args, **kw):
        qcontext = self.get_auth_signup_qcontext()
        qcontext['cities'] = request.env['res.city'].sudo().search([])
        qcontext['states'] = request.env['res.country.state'].sudo().search([])
        qcontext['countries'] = request.env['res.country'].sudo().search([['code', '=', 'VN']])
        categories = http.request.env['pos.category'].sudo().search([])
        a = []
        for x in categories:
            b = x.parent_id.id
            a.append(b)
        e = list(OrderedDict.fromkeys(a))
        e.remove(False)
        qcontext['cates'] = request.env['pos.category'].sudo().search([('id','in',e)])
        if not qcontext.get('token') and not qcontext.get('signup_enabled'):
            raise werkzeug.exceptions.NotFound()

        if 'error' not in qcontext and request.httprequest.method == 'POST':
            try:
                self.do_signup(qcontext)
                # Send an account creation confirmation email
                if qcontext.get('token'):
                    user_sudo = request.env['res.users'].sudo().search([('login', '=', qcontext.get('login'))])
                    template = request.env.ref('auth_signup.mail_template_user_signup_account_created',
                                               raise_if_not_found=False)
                    if user_sudo and template:
                        template.sudo().with_context(
                            lang=user_sudo.lang,
                            auth_login=werkzeug.url_encode({'auth_login': user_sudo.email}),
                        ).send_mail(user_sudo.id, force_send=True)
                return self.web_login(*args, **kw)
            except UserError as e:
                qcontext['error'] = e.name or e.value
            except (SignupError, AssertionError) as e:
                if request.env["res.users"].sudo().search([("login", "=", qcontext.get("login"))]):
                    qcontext["error"] = _("Another user is already registered using this email address.")
                else:
                    _logger.error("%s", e)
                    qcontext['error'] = _("Could not create a new account.")

        response = request.render('auth_signup.signup', qcontext)
        response.headers['X-Frame-Options'] = 'DENY'
        return response
