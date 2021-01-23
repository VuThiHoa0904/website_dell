# -*- coding: utf-8 -*-
{
    'name': "WebsiteDell",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/13.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base',
                'website',
                'sale',
                'website_sale',
                'website_sale_comparison'],

    # always loaded
    'data': [
        'security/group_user.xml',
        'security/ir.model.access.csv',
        'browser/menu.xml',
        'browser/home.xml',
        'browser/footer.xml',
        'views/banner_view.xml',
        'views/product_inherit.xml',
        'browser/add_to_cart.xml',
        'browser/product_detail.xml',
        "views/assets.xml",
        "views/templates.xml",
        "views/website_sale_attribute_filter_category_view.xml",
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
