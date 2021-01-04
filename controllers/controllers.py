# -*- coding: utf-8 -*-
# from odoo import http


# class WebsiteDell(http.Controller):
#     @http.route('/website_dell/website_dell/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/website_dell/website_dell/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('website_dell.listing', {
#             'root': '/website_dell/website_dell',
#             'objects': http.request.env['website_dell.website_dell'].search([]),
#         })

#     @http.route('/website_dell/website_dell/objects/<model("website_dell.website_dell"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('website_dell.object', {
#             'object': obj
#         })
