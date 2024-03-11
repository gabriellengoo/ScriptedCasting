import { A11yEmoji } from 'a11y-react-emoji';
import { MdSettings, MdColorLens, MdMenu } from 'react-icons/md'; // Import icons from react-icons library
// const Project = () => <A11yEmoji symbol="🏠" label="Home Icon" />;


export default {
  name: 'works',
  title: 'Works Page Grid',
  type: 'document',
  // icon: "🏠",
  // icon: '🏠',
  // liveEdit: true,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'grid',
      title: 'Grid Left',
      type: 'grid',
    },
    {
      name: 'gridm',
      title: 'Grid Middle',
      type: 'gridm',
    },
    {
      name: 'gride',
      title: 'Grid Middle 2',
      type: 'gride',
    },
    {
      name: 'gridl',
      title: 'Grid End',
      type: 'gride',
    },
    


  ],
  preview: {
    select: {
      title: 'title',
    },
    // prepare(selection) {
    //   const { title } = selection;
    //   return {
    //     title: `📽️ ${title}`,
    //   };
    // },
  },
};
