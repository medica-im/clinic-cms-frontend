# Generated by Django 4.1.1 on 2022-10-21 01:33

from django.db import migrations, models
import django.db.models.deletion
import opengraph.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
    ]

    operations = [
        migrations.CreateModel(
            name='TwitterCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=70)),
                ('description', models.CharField(max_length=200)),
                ('username', models.CharField(help_text='twitter:site @username the card should be attributed to.', max_length=16, validators=[opengraph.models.validate_twitter_username])),
                ('image_alt', models.CharField(blank=True, max_length=420)),
                ('image', models.ImageField(blank=True, help_text='1.91:1 1200px X 628px max 5MB', null=True, upload_to='opengraph/')),
                ('site', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='sites.site', verbose_name='site')),
            ],
        ),
    ]