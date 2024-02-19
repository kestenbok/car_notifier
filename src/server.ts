import fastify from 'fastify';
import VehicleService from './services/vehicle';

function configureServer(service: VehicleService) {
  const server = fastify();

  server.get('/', async () => {
    const result = await service.get();
    return result;
  });

  server.post('/refresh', async () => {
    await service.update();
    return service.get();
  });

  return server;
}

export default configureServer;
