declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'givebutter-widget': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement> & { id: string },
          HTMLElement
        >;
      }
    }
  }
}

export {};
