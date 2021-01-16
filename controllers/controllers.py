from odoo import http

import json
from odoo.addons.portal.controllers.web import Home
from odoo.http import request
from odoo.addons.website.controllers.main import Website
from collections import OrderedDict

class Website(Website):
    @http.route(auth='public')
    def index(self, data={},**kw):
        super(Website, self).index(**kw)
        return http.request.render('website.homepage', data)

    @http.route(['/'], type='http', auth="public", website=True)
    def submenu(self, **kwargs):
        cates = http.request.env['pos.category'].sudo().search([])
        print("============================")
        print(cates)
        return request.render("website.affix_top_menu", {
            'cates': cates,
        })

    @http.route('/', type='http', auth="public", website=True)
    def index(self, **kw):
        bans = http.request.env['website_dell.banner'].sudo().search([])
        products = http.request.env['product.template'].sudo().search([])
        categories = http.request.env['pos.category'].sudo().search([])
        a = []
        for x in categories:
            b = x.parent_id.id
            a.append(b)
        e = list(OrderedDict.fromkeys(a))
        e.remove(False)
        print("============================")
        print(e)
        cates = http.request.env['pos.category'].sudo().search([('id','in',e)])
        print("+++++++++++++++++++++++++")
        print(cates)
        companys = http.request.env['res.partner']
        return request.render("website.homepage",{
            'bans': bans,
            'cates': cates,
            'products': products,
            'companys': companys.sudo().search([])
        })
    # @http.route('/', type='http', auth="public", website=True)
    # def index(self, **kw):
    #     super(Website, self).index(**kw)
    #     bans = http.request.env['website_dell.banner'].sudo().search([])
    #     print("============================")
    #     print(bans)
    #     values = {
    #         'bans': bans,
    #     }
    #     return http.request.render('website.homepage',{
    #         'bans': bans,
    #     })
