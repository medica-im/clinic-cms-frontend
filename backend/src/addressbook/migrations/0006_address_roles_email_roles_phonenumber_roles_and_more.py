# Generated by Django 4.0.6 on 2022-07-10 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('access', '0003_role_description_en_role_description_fr_and_more'),
        ('addressbook', '0005_alter_email_facility_alter_phonenumber_facility_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='roles',
            field=models.ManyToManyField(blank=True, help_text='Roles allowed so see the related object', to='access.role'),
        ),
        migrations.AddField(
            model_name='email',
            name='roles',
            field=models.ManyToManyField(blank=True, help_text='Roles allowed so see the related object', to='access.role'),
        ),
        migrations.AddField(
            model_name='phonenumber',
            name='roles',
            field=models.ManyToManyField(blank=True, help_text='Roles allowed so see the related object', to='access.role'),
        ),
        migrations.AddField(
            model_name='socialnetwork',
            name='roles',
            field=models.ManyToManyField(blank=True, help_text='Roles allowed so see the related object', to='access.role'),
        ),
        migrations.AddField(
            model_name='website',
            name='roles',
            field=models.ManyToManyField(blank=True, help_text='Roles allowed so see the related object', to='access.role'),
        ),
    ]