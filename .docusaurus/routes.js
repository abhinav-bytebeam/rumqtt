import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '102'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'a02'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'e66'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'b2f'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'd55'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '751'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'a14'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'af6'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '373'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'fae'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '838'),
            routes: [
              {
                path: '/docs/Introduction',
                component: ComponentCreator('/docs/Introduction', 'de5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttc/Developer Guide/rumqttc internals',
                component: ComponentCreator('/docs/rumqttc/Developer Guide/rumqttc internals', '9cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttc/Examples',
                component: ComponentCreator('/docs/rumqttc/Examples', 'e5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttc/FAQs',
                component: ComponentCreator('/docs/rumqttc/FAQs', '1e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttc/Introduction',
                component: ComponentCreator('/docs/rumqttc/Introduction', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttc/Releases/rumqttc_v0_24_0',
                component: ComponentCreator('/docs/rumqttc/Releases/rumqttc_v0_24_0', 'c2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Configuration',
                component: ComponentCreator('/docs/rumqttd/Configuration', '305'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/FAQs',
                component: ComponentCreator('/docs/rumqttd/FAQs', '4e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Guides/Collecting Metrics',
                component: ComponentCreator('/docs/rumqttd/Guides/Collecting Metrics', 'fb5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Guides/Embedding rumqttd in your application',
                component: ComponentCreator('/docs/rumqttd/Guides/Embedding rumqttd in your application', '48e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Guides/Logs and monitoring',
                component: ComponentCreator('/docs/rumqttd/Guides/Logs and monitoring', '19a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Guides/Using Link to communicate with broker',
                component: ComponentCreator('/docs/rumqttd/Guides/Using Link to communicate with broker', '788'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Installation',
                component: ComponentCreator('/docs/rumqttd/Installation', '033'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rumqttd/Introduction',
                component: ComponentCreator('/docs/rumqttd/Introduction', '6a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2eb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
