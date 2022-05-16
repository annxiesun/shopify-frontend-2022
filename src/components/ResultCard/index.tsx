import React from "react";
import PropTypes from "prop-types";

import { AppProvider, TextField, Button, Card } from "@shopify/polaris";
import { TextItem } from "../../types";

import FadeIn from 'react-fade-in';
interface ResultCardProps {
  textItem: TextItem;
}
const styles= {
    card: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    head: {

    }
}
export default function ResultCard({ textItem }: ResultCardProps): JSX.Element {
  const { prompt, response } = textItem;

  return (
    <FadeIn>
      <div style={{marginBottom: '24px'}}>
    <Card>
        <Card.Section>
            <h5>Prompt</h5>
            <p>{prompt}</p>
        </Card.Section>

        <Card.Section>
            <h5>Response</h5>
            <p>{response}</p>
        </Card.Section>
    </Card>
    </div>
    </FadeIn>
  );
}

ResultCard.propTypes = {
  textItem: PropTypes.object,
};
