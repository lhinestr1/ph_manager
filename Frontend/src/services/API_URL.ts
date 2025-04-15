export default import.meta.env.VITE_API_HOST === 'auto'
  ? `${window.location.origin.replace(/\/$/g, '')}${
      import.meta.env.VITE_API_PATH
    }`
  : `${import.meta.env.VITE_API_HOST!.replace(/\/$/g, '')}${
      import.meta.env.VITE_API_PATH
    }`;
