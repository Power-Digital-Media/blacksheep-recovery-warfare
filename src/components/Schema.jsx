import React from 'react';

/**
 * A reusable component to safely inject JSON-LD Structured Data into the DOM for SEO.
 * It will output a <script type="application/ld+json"> containing the provided data.
 */
export const Schema = ({ data }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

export default Schema;
