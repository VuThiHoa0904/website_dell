from odoo import models, fields, api


class website_dell(models.Model):
    _name = 'website_dell.banner'

    name = fields.Char(string='Tên banner')
    image = fields.Binary()
    des = fields.Char(string='Mô tả')
    main = fields.Boolean("Banner chính")