# Generated by Django 5.1.1 on 2024-09-12 05:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('discipline', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='discipline',
            options={'verbose_name': 'Disciplina'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Usuário'},
        ),
    ]
