from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Matakuliah

@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """Mendapatkan semua matakuliah"""
    items = request.dbsession.query(Matakuliah).all()
    return {'matakuliah': [m.to_dict() for m in items]}

@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """Menambahkan matakuliah baru"""
    try:
        data = request.json_body
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(new_mk)
        return {'success': True, 'matakuliah': new_mk.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """Update data matakuliah"""
    dbsession = request.dbsession
    id_mk = request.matchdict['id']
    item = dbsession.query(Matakuliah).filter_by(id=id_mk).first()
    
    if not item:
        return HTTPNotFound(json_body={'error': 'Data tidak ditemukan'})
        
    data = request.json_body
    if 'nama_mk' in data: item.nama_mk = data['nama_mk']
    if 'sks' in data: item.sks = data['sks']
    if 'semester' in data: item.semester = data['semester']
    
    return {'success': True, 'matakuliah': item.to_dict()}

@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """Hapus data matakuliah"""
    dbsession = request.dbsession
    id_mk = request.matchdict['id']
    item = dbsession.query(Matakuliah).filter_by(id=id_mk).first()
    
    if not item:
        return HTTPNotFound(json_body={'error': 'Data tidak ditemukan'})
        
    dbsession.delete(item)
    return {'success': True, 'message': f'ID {id_mk} berhasil dihapus'}