# Car Notifier

A handy helper to easily keep track of your vehicles':

- vignette
- insurance
- outstanding fines

It does this by syncing said information on a daily basis, with the abillity to do on-demand refreshes. It exposes a minimal HTTP API:

```typescript
type VehicleInformation = {
    plate: string;
    fines: Fine[];
    vignette: Vignette;
    insurance: Insurance;
};

// GET "/"
get(): Promise<VehicleInformation[]>
// POST "/refresh"
refresh(): Promise<VehicleInformation[]>
```

## Getting started

1. Make sure that you have `docker` installed and running on your system
2. Set up your environment: `$ cp .env.example .env`
3. Run the server `$ docker compose up -d`
