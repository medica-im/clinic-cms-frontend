# Generated by Django 4.0.3 on 2022-04-01 10:57

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import easy_thumbnails.fields
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0004_alter_taggeditem_content_type_alter_taggeditem_tag'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_name', models.CharField(max_length=255)),
                ('first_name', models.CharField(max_length=255)),
                ('middle_name', models.CharField(blank=True, max_length=255)),
                ('title', models.CharField(blank=True, max_length=255)),
                ('organization', models.CharField(blank=True, max_length=255)),
                ('url', models.URLField(blank=True)),
                ('blurb', models.TextField(blank=True, null=True)),
                ('profile_image', easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='profile_images/')),
                ('qr_image', models.ImageField(blank=True, null=True, upload_to='qr_images/')),
                ('twitter_handle', models.CharField(blank=True, max_length=15, null=True)),
            ],
            options={
                'ordering': ['first_name', 'last_name'],
            },
        ),
        migrations.CreateModel(
            name='ContactGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Group Name')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Website',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website', models.URLField(blank=True)),
                ('type', models.CharField(choices=[('W', 'Work'), ('PE', 'Personal'), ('PO', 'Portfolio'), ('Blog', 'Blog')], max_length=255)),
                ('public_visible', models.BooleanField(default=False)),
                ('contact_visible', models.BooleanField(default=False)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='addressbook.contact')),
            ],
        ),
        migrations.CreateModel(
            name='SocialNetwork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handle', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('S', 'Skype'), ('T', 'Twitter'), ('LI', 'LinkedIn'), ('F', 'Facebook'), ('P', 'Pinterest')], max_length=255)),
                ('public_visible', models.BooleanField(default=False)),
                ('contact_visible', models.BooleanField(default=False)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='addressbook.contact')),
            ],
        ),
        migrations.CreateModel(
            name='PhoneNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('M', 'Mobile'), ('MW', 'Mobile Work'), ('W', 'Work'), ('F', 'Fax'), ('S', 'Skype'), ('AS', 'Answering service')], max_length=255)),
                ('public_visible', models.BooleanField(default=False)),
                ('contact_visible', models.BooleanField(default=False)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='addressbook.contact')),
            ],
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('type', models.CharField(choices=[('P', 'Personal'), ('W', 'Work')], max_length=255)),
                ('public_visible', models.BooleanField(default=False)),
                ('contact_visible', models.BooleanField(default=False)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='addressbook.contact')),
            ],
        ),
        migrations.AddField(
            model_name='contact',
            name='groups',
            field=models.ManyToManyField(to='addressbook.contactgroup'),
        ),
        migrations.AddField(
            model_name='contact',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='contact',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='contact',
            name='worked_with',
            field=models.ManyToManyField(blank=True, to='addressbook.contact'),
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(blank=True, max_length=255, null=True)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('zip', models.CharField(blank=True, max_length=255, null=True)),
                ('type', models.CharField(choices=[('Home', 'Home'), ('Work', 'Work')], max_length=255)),
                ('public_visible', models.BooleanField(default=False)),
                ('contact_visible', models.BooleanField(default=False)),
                ('latitude', models.DecimalField(blank=True, decimal_places=7, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=7, max_digits=10, null=True)),
                ('zoom', models.PositiveSmallIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(21)])),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='addressbook.contact')),
            ],
        ),
    ]
