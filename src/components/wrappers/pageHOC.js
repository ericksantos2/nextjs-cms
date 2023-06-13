import CMSProvider from '../../infra/cms/CMSProvider.js'

export function pageHOC(Component) {
  return function Wrapper(props) {
    return (
      <CMSProvider cmsContent={props.cmsContent}>
        <Component {...props} />
      </CMSProvider>
    );
  }
}
