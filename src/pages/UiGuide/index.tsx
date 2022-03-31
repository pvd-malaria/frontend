import React from 'react';

import Layout from '../../components/Layout';

import styles from './styles.module.scss';


function UiGuide() {
  return (
    <Layout>
      <div className={styles.typograph}>
        <h1>h1: .title.bold</h1>
        <h2>h2: .title.regular</h2>
        <h3>h3: .title.light</h3>
        <h4>h4: .subtitle.regular</h4>
        <h5>h5: .subtitle.light</h5>
        <p><strong>p: .paragraph.bold</strong></p>
        <p>p: .paragraph.regular</p>
        <small>small: .small.light</small>
        <small>small: .small.light</small>
      </div>

      <ul className={styles.colorList}>
        <li className="primary-color-red">.primary-color-red</li>
        <li className="color-red-light">.color-red-light</li>
        <li className="color-red-lighter">.color-red-lighter</li>
        <li className="primary-color-blue">.primary-color-blue</li>
        <li className="color-blue-light">.color-blue-light</li>
        <li className="color-blue-lighter">.color-blue-lighter</li>
        <li className="primary-color-yellow">.primary-color-yellow</li>
        <li className="color-yellow-light">.color-yellow-light</li>
        <li className="color-yellow-lighter">.color-yellow-lighter</li>
        <li className="primary-color-black">.primary-color-black</li>
        <li className="color-black-light">.color-black-light</li>
        <li className="color-black-lighter">.color-black-lighter</li>
      </ul>

      <ul className={styles.colorList}>
        <li className="bg-primary-color-red">.bg-primary-color-red</li>
        <li className="bg-color-red-light">.bg-color-red-light</li>
        <li className="bg-color-red-lighter">.bg-color-red-lighter</li>

        <li className="bg-primary-color-blue">.bg-primary-color-blue</li>
        <li className="bg-color-blue-light">.bg-color-blue-light</li>
        <li className="bg-color-blue-lighter">.bg-color-blue-lighter</li>
        
        <li className="bg-primary-color-yellow">.bg-primary-color-yellow</li>
        <li className="bg-color-yellow-light">.bg-color-yellow-light</li>
        <li className="bg-color-yellow-lighter">.bg-color-yellow-lighter</li>
        
        <li className="bg-primary-color-black">.bg-primary-color-black</li>
        <li className="bg-color-black-light">.bg-color-black-light</li>
        <li className="bg-color-black-lighter">.bg-color-black-lighter</li>
      </ul>
    </Layout>
  );
}

export default UiGuide;