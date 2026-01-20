type VelarComponentFile = {
    type: 'blade' | 'js' | 'css';
    path: string;
};


export interface VelarComponentMeta {
    name: string;
    description?: string;

    categories?: string[];

    files: VelarComponentFile[];

    requires?: {
        alpine?: boolean;
    };

    components?: string[];

    dependencies?: {
        npm?: string[];
        composer?: string[];
    };
}


export interface VelarConfig {
  version: string;

  theme: string;

  css: {
    entry: string;
    velar: string;
  };

  components: {
    path: string;
  };
}
