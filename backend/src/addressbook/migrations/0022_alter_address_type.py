# Generated by Django 4.1.9 on 2023-05-14 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addressbook', '0021_alter_address_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='type',
            field=models.CharField(choices=[('Home', 'Home'), ('Work', 'Work')], max_length=255),
        ),
    ]