from odoo import models, fields, api


class Product(models.Model):
    _inherit = 'product.template'

    product_hot = fields.Boolean('Sản phẩm hot')
    technical_specification = fields.Html("Thông số kĩ thuật", help='Thông số kĩ thuật sản phẩm')

