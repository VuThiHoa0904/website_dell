# -*- coding: utf-8 -*-

from odoo import fields, models


class ResPartner(models.Model):
    _inherit = "res.partner"

    birthday = fields.Date('Date of Birth')
    scale = fields.Selection(
        string='Quy mô',
        selection=[('under10', 'Duới 10 người'),
                   ('10to50', 'Từ 10 đến 50 người'),
                   ('50to100', 'Từ 50 đến 100 người'),
                   ('100to200', 'Từ 100 đến 200 người'),
                   ('200to300', 'Từ 200 đến 300 người'),
                   ('300to500', 'Từ 300 đến 500 người'),
                   ('up500', 'Trên 500 người'),],
        required=False, )


