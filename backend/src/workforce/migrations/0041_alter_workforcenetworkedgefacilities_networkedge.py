# Generated by Django 4.1.9 on 2023-05-23 19:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workforce', '0040_alter_workforcenetworkedgeorganizations_networkedge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workforcenetworkedgefacilities',
            name='networkedge',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workforce.networkedge'),
        ),
    ]