import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { FormFieldWrapper, TextWidget } from '@plone/volto/components';
import { Grid, Button } from 'semantic-ui-react';

const messages = defineMessages({
  addTerm: {
    id: 'vocabulary_icons_widget_add_term',
    defaultMessage: 'Add term',
  },
  icon: {
    id: 'vocabulary_icons_widget_icon',
    defaultMessage: 'Icon',
  },
  label: {
    id: 'vocabulary_icons_widget_label',
    defaultMessage: 'Label',
  },
  deleteButton: {
    id: 'vocabulary_icons_widget_remove_term',
    defaultMessage: 'Remove term',
  },
});

const defaultItem = { icon: '', label: '' };

const VocabularyIconsWidget = (props) => {
  const intl = useIntl();
  const { value, id, onChange, required, title, description } = props;
  const [values, setValues] = useState(
    value?.length > 0 ? value : [defaultItem],
  );

  useEffect(() => {
    setValues(value);
  }, [value]);

  const handleChangeConfiguration = (v) => {
    onChange(id, v);
  };

  const onChangeTerm = (index, field, value) => {
    let newValues = [...values];
    newValues[index][field] = value;

    handleChangeConfiguration(newValues);
  };

  const addTerm = () => {
    let newValues = [...values, defaultItem];
    handleChangeConfiguration(newValues);
  };
  const deleteTerm = () => {
    let newValues = [...values, defaultItem];
    handleChangeConfiguration(newValues);
  };

  return (
    <FormFieldWrapper {...props}>
      <Grid>
        {values?.map((term, index) => (
          <Grid.Row>
            <Grid.Column width={1}>icona </Grid.Column>
            <Grid.Column width={5}>
              <TextWidget
                id="icon"
                title={intl.formatMessage(messages.icon)}
                placeholder={intl.formatMessage(messages.icon)}
                wrapped={false}
                description=""
                required={true}
                value={term.icon}
                onChange={(id, value) => onChangeTerm(index, id, value)}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <TextWidget
                id="label"
                title={intl.formatMessage(messages.label)}
                placeholder={intl.formatMessage(messages.label)}
                wrapped={false}
                description=""
                required={true}
                value={term.label}
                onChange={(id, value) => onChangeTerm(index, id, value)}
              />
            </Grid.Column>
            <Grid.Column width={1}>
              <Button
                icon="trash"
                negative
                onClick={(e) => deleteTerm(e, index)}
                id="delete-term"
                content={intl.formatMessage(messages.deleteButton)}
              />
            </Grid.Column>
          </Grid.Row>
        ))}
        <Grid.Row columns={1}>
          <Grid.Column>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addTerm();
              }}
              size="mini"
            >
              {intl.formatMessage(messages.addTerm)}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FormFieldWrapper>
  );
};

export default VocabularyIconsWidget;
