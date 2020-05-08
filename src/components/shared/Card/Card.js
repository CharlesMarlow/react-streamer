import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../../utils/commonFunctions';
import { Card, Button } from 'semantic-ui-react';
import './Card.css';

const ExperimentCard = ({ experiment, onEditClick }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header className="truncate">{experiment.name}</Card.Header>
      </Card.Content>
      <Card.Content description={`ID: ${experiment.id}`}></Card.Content>
      <Card.Content
        description={`Mode: ${capitalize(experiment.mode)}`}
      ></Card.Content>
      <Card.Content
        description={`Type: ${capitalize(experiment.type.toLowerCase())}`}
      ></Card.Content>
      <Card.Content extra className="actions">
        <Link to={`/experiments/${experiment.id}`}>
          <Button inverted primary>
            Details
          </Button>
        </Link>
        <Button inverted secondary onClick={onEditClick}>
          Edit
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ExperimentCard;
