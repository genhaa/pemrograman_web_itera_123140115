from pyramid.config import Configurator

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        })
    event.request.add_response_callback(cors_headers)

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')
        
        # Jembatan CORS Manual agar tidak Failed to Fetch
        config.add_subscriber(add_cors_headers_response_callback, 'pyramid.events.NewRequest')
        
        config.scan()
    return config.make_wsgi_app()