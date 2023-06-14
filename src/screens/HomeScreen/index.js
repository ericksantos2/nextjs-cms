import { cmsService } from '../../infra/cms/cmsService.js';
import { pageHOC } from '../../components/wrappers/pageHOC.js';
import { CMSSectionRender } from '../../infra/cms/CMSSectionRender';

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
      query {
        pageHome {
          pageContent {
            section {
              componentName: __typename
              ... on CommonSeoBlockRecord {
                id
                title
              }
              ... on CommonMenuRecord {
                id
              }
              ... on CommonFooterRecord {
                id
                visible
              }
              ... on PagehomeHerosectionRecord {
                id
                title
                description
                ctatext
                ctalink
              }
            }
          }
        }
      }
    `,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
    revalidate: 60
  };
}

function HomeScreen() {
  return (
    <CMSSectionRender pageName="pageHome" />
  )
}

// function HomeScreen() {
//   return (
//     <>
//       {/* Common SEO Block */}
//       <Head>
//         <title>Home - Alura</title>
//       </Head>

//       {/* Menu */}
//       <Menu />

//       {/* HEROSECTION */}
      

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// }

export default pageHOC(HomeScreen);
