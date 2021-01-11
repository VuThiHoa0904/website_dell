from odoo import http

import json
from odoo.addons.portal.controllers.web import Home
from odoo.http import request
from odoo.addons.website.controllers.main import Website

class Website_dell(http.Controller):

    @http.route(['/default-main-menu'], type='http', auth="public", website=True)
    def submenu(self, **kwargs):
        cates = http.request.env['pos.category'].sudo().search([])
        print("============================")
        print(cates)
        return request.render("website_dell.top_menu_inherit", {
            'cates': cates,
        })