import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models

def setup_models(dbsession):
    print("Script sedang berjalan...") # Tambahkan ini buat ngetes
    matakuliah_data = [
        {'kode': 'IF25-41029', 'nama': 'Metodologi Penelitian (RB)', 'sks': 3},
        {'kode': 'IF25-22015', 'nama': 'Sistem Informasi (RB)', 'sks': 2},
        {'kode': 'IF25-41031', 'nama': 'Kapita Selekta (RD)', 'sks': 3},
    ]

    for item in matakuliah_data:
        exists = dbsession.query(models.Matakuliah).filter_by(kode_mk=item['kode']).first()
        if not exists:
            mk = models.Matakuliah(
                kode_mk=item['kode'],
                nama_mk=item['nama'],
                sks=item['sks'],
                semester=5 
            )
            dbsession.add(mk)
            print(f"Berhasil menambahkan: {item['nama']}")
        else:
            print(f"Data {item['kode']} sudah ada di DB!") 

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')

if __name__ == '__main__':
    main()