import React from "react";
import PropTypes from 'prop-types';

import { AppProvider, TextField, Button, Card } from "@shopify/polaris";
import { TextItem } from "../types";

interface ResultCardProps {
  textItem: TextItem;
}
export default function ResultCard({ textItem }: ResultCardProps): JSX.Element {
  const { prompt, response } = textItem;

  return (
    <Card>
      <Card.Subsection>
        <p>{prompt}</p>
      </Card.Subsection>

      <Card.Subsection>
        <p>{response}</p>
      </Card.Subsection>
    </Card>
  );
}

ResultCard.propTypes = {
    textItem: PropTypes.object
  };