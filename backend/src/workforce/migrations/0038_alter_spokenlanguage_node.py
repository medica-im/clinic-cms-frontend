# Generated by Django 4.1.9 on 2023-05-11 02:05

from django.db import migrations, models
import django.db.models.deletion
import workforce.models.limit_choices


class Migration(migrations.Migration):

    dependencies = [
        ('workforce', '0037_spokenlanguage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spokenlanguage',
            name='node',
            field=models.OneToOneField(limit_choices_to=workforce.models.limit_choices.limit_to_users, on_delete=django.db.models.deletion.CASCADE, to='workforce.networknode'),
        ),
    ]
