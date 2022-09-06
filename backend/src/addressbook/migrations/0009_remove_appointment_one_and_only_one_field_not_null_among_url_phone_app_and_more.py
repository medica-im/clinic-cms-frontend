# Generated by Django 4.0.6 on 2022-08-05 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addressbook', '0008_app_appstore_appointment_applink_app_links_and_more'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='appointment',
            name='one_and_only_one_field_not_null_among_url_phone_app',
        ),
        migrations.AddConstraint(
            model_name='appointment',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('app__isnull', True), ('phone__length__lte', 0), ('url__length__gt', 0)), models.Q(('app__isnull', True), ('phone__length__gt', 0), ('url__length__lte', 0)), models.Q(('app__isnull', False), ('phone__length__lte', 0), ('url__length__lte', 0)), _connector='OR'), name='one_and_only_one_field_not_null_among_url_phone_app'),
        ),
    ]
