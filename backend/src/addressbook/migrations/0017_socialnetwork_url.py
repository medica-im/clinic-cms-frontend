# Generated by Django 4.1 on 2022-09-18 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('addressbook', '0016_alter_contact_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='socialnetwork',
            name='url',
            field=models.URLField(blank=True),
        ),
    ]