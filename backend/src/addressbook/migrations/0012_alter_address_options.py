# Generated by Django 4.1 on 2022-09-05 15:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addressbook', '0011_appointment_organization_email_organization_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='address',
            options={'verbose_name_plural': 'Addresses'},
        ),
    ]