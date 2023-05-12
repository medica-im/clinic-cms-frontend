from workforce.models import NodeSet

def limit_to_users():
    return {'node_set': NodeSet.objects.get(name='user')}
    
def limit_to_occupations():
    return {'node_set': NodeSet.objects.get(name='occupation')}