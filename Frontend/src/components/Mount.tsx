import React, { useEffect } from "react";


type MountProps<T> = {
    before: () => Promise<T>;
    component: React.ComponentType<T>;
    loadingComponent?: React.ComponentType;
    errorComponent?: React.ComponentType;
  };
  
  export function Mount<T>({
    before,
    component: Component,
    loadingComponent: Loading = () => <div>Cargando...</div>,
    errorComponent: Error = () => <div>Ocurrió un error</div>,
  }: MountProps<T>) {
    const [state, setState] = React.useState<{
      data?: T;
      error?: any;
      loading: boolean;
    }>({
      loading: true,
    });
  
    useEffect(() => {
      let cancelled = false;
  
      (async () => {
        try {
          const data = await before();
          if (!cancelled) setState({ data, loading: false });
        } catch (err) {
          if (!cancelled) setState({ error: err, loading: false });
        }
      })();
  
      return () => {
        cancelled = true;
      };
    }, [before]);
  
    if (state.loading) return <Loading />;
    if (state.error) return <Error />;
    return <Component {...state.data!} />;
  }
  