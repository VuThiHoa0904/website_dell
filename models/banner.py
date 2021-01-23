from odoo.http import request
from odoo import api, fields, SUPERUSER_ID, http,models, _


class website_dell(models.Model):
    _name = 'website_dell.banner'

    name = fields.Char(string='Tên banner')
    image = fields.Binary()
    des = fields.Char(string='Mô tả')
    main = fields.Boolean("Banner chính")

class website(models.Model):
    _inherit = 'website'

    def add_website_product(self, product_id):
        sale_get_order = request.website.sale_get_order(force_create=1)
        product_uom_qty= 0.0
        if sale_get_order:
            sale_order_line_obj = self.env['sale.order.line']
            sale_order_line_ids = sale_order_line_obj.sudo().search([('order_id', '=', sale_get_order.id), ('product_id', '=', product_id)])
            for order_id in sale_order_line_ids:
                product_uom_qty += sale_order_line_obj.product_uom_qty
            return int(product_uom_qty)
        return int(product_uom_qty)

class ProductAttributeCategory(models.Model):
    _inherit = "product.attribute.category"

    website_folded = fields.Boolean(string="Website folded", default=True,)