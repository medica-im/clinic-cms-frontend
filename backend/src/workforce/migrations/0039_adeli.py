# Generated by Django 4.1.9 on 2023-05-21 20:58

from django.db import migrations, models
import django.db.models.deletion
import workforce.models.french


class Migration(migrations.Migration):

    dependencies = [
        ('workforce', '0038_alter_spokenlanguage_node'),
    ]

    operations = [
        migrations.CreateModel(
            name='ADELI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifier', models.CharField(blank=True, max_length=9, null=True, validators=[workforce.models.french.validate_isdigit, workforce.models.french.validate_adeli_length], verbose_name='ADELI number')),
                ('node', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='adeli', to='workforce.networknode')),
            ],
        ),
    ]
