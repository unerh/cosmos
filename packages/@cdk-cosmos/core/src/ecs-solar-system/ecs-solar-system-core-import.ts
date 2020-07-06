import { ICluster } from '@aws-cdk/aws-ecs';
import { IApplicationLoadBalancer, IApplicationListener } from '@aws-cdk/aws-elasticloadbalancingv2';
import { IGalaxyCore } from '../galaxy/galaxy-core-stack';
import { RemoteCluster, RemoteAlb, RemoteApplicationListener } from '../helpers/remote';
import { SolarSystemCoreImport, SolarSystemCoreImportProps } from '../solar-system/solar-system-core-import';
import { IEcsSolarSystemCore } from './ecs-solar-system-core-stack';

export const EcsSolarSystemCoreImportBuilder = (
  base: typeof SolarSystemCoreImport
): typeof EcsSolarSystemCoreImportBase => {
  return class EcsSolarSystemCoreImport extends base implements IEcsSolarSystemCore {
    readonly cluster: ICluster;
    readonly alb: IApplicationLoadBalancer;
    readonly httpListener: IApplicationListener;
    readonly httpInternalListener: IApplicationListener;
    readonly httpsListener: IApplicationListener;
    readonly httpsInternalListener: IApplicationListener;

    constructor(galaxy: IGalaxyCore, id: string, props?: SolarSystemCoreImportProps) {
      super(galaxy, id, props);

      this.cluster = RemoteCluster.import(this, this.singletonId('Cluster'), this.vpc);
      this.alb = RemoteAlb.import(this, this.singletonId('Alb'), this.vpc);
      this.httpListener = RemoteApplicationListener.import(this, this.singletonId('HttpListener'));
      this.httpInternalListener = RemoteApplicationListener.import(this, this.singletonId('HttpInternalListener'));
      this.httpsListener = RemoteApplicationListener.import(this, this.singletonId('HttpsListener'));
      this.httpsInternalListener = RemoteApplicationListener.import(this, this.singletonId('HttpsInternalListener'));
    }
  };
};

// Implementations

declare class EcsSolarSystemCoreImportBase extends SolarSystemCoreImport implements IEcsSolarSystemCore {
  readonly cluster: ICluster;
  readonly alb: IApplicationLoadBalancer;
  readonly httpListener: IApplicationListener;
  readonly httpInternalListener: IApplicationListener;
  readonly httpsListener: IApplicationListener;
  readonly httpsInternalListener: IApplicationListener;

  constructor(galaxy: IGalaxyCore, id: string, props?: SolarSystemCoreImportProps);
}

export class EcsSolarSystemCoreImport extends EcsSolarSystemCoreImportBuilder(SolarSystemCoreImport) {}