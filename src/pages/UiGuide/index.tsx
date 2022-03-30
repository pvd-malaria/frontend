import React from 'react';

import Layout from '../../components/Layout';


function UiGuide() {
  return (
    <Layout>
      <h1>h1: .title.bold</h1>
      <h2>h2: .title.regular</h2>
      <h3>h3: .title.light</h3>
      <h4>h4: .subtitle.regular</h4>
      <h5>h5: .subtitle.light</h5>
      <p><strong>p: .paragraph.bold</strong></p>
      <p>p: .paragraph.regular</p>
      <small>small: .small.light</small>
      <small>small: .small.light</small>
    </Layout>
  );
}

export default UiGuide;