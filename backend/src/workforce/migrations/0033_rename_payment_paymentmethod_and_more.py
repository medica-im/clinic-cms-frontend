# Generated by Django 4.1.9 on 2023-05-08 12:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workforce', '0032_payment_payment_unique_payment_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Payment',
            new_name='PaymentMethod',
        ),
        migrations.AlterModelOptions(
            name='paymentmethod',
            options={'verbose_name_plural': 'Payment methods'},
        ),
        migrations.AlterModelOptions(
            name='rpps',
            options={},
        ),
    ]
