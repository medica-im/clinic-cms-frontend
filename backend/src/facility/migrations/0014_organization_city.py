# Generated by Django 4.1.7 on 2023-03-16 07:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0001_initial'),
        ('facility', '0013_category_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='city',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='nlp.city'),
        ),
    ]