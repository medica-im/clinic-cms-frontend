# Generated by Django 4.0.5 on 2022-06-28 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facility', '0003_facility_node'),
        ('addressbook', '0003_alter_address_contact_alter_email_contact_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='facility',
            field=models.ManyToManyField(to='facility.facility'),
        ),
        migrations.AddField(
            model_name='phonenumber',
            name='facility',
            field=models.ManyToManyField(to='facility.facility'),
        ),
        migrations.AddField(
            model_name='socialnetwork',
            name='facility',
            field=models.ManyToManyField(to='facility.facility'),
        ),
        migrations.AddField(
            model_name='website',
            name='facility',
            field=models.ManyToManyField(to='facility.facility'),
        ),
    ]