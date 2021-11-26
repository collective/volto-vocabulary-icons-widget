/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { defineMessages, useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldWrapper, TextWidget } from "@plone/volto/components";
import { Grid, Button, Placeholder } from "semantic-ui-react";
import "./vocabulary_icons_widget.css";

const messages = defineMessages({
  addTerm: {
    id: "vocabulary_icons_widget_add_term",
    defaultMessage: "Add term",
  },
  icon: {
    id: "vocabulary_icons_widget_icon",
    defaultMessage: "Icon",
  },
  label: {
    id: "vocabulary_icons_widget_label",
    defaultMessage: "Label",
  },
  deleteButton: {
    id: "vocabulary_icons_widget_remove_term",
    defaultMessage: "Remove term",
  },
  infos: {
    id: "vocabulary_icons_widget_infos",
    defaultMessage: "Select icons names from {fa}.",
  },
});

const defaultItem = { token: "", title: "" };

const VocabularyIconsWidget = (props) => {
  const intl = useIntl();
  const { value, id, onChange } = props; //, required, title, description
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(value?.length > 0 ? value : [defaultItem]);
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
    setValues(newValues);
  };

  const deleteTerm = (index) => {
    let newValues = [...values];
    newValues.splice(index, 1);

    handleChangeConfiguration(newValues);
  };

  return (
    <FormFieldWrapper {...props}>
      <div className="vocabulary-icons-widget">
        <div className="infos">
          {intl.formatMessage(messages.infos, {
            fa: (
              <a
                href="https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free"
                target="_blank"
                rel="noreferrer"
              >
                Fontawesome
              </a>
            ),
          })}
        </div>
        <Grid verticalAlign="middle" padded>
          {values?.map((term, index) => (
            <Grid.Row key={index}>
              <Grid.Column width={1} textAlign="center" className="icon-column">
                {term.token ? (
                  <FontAwesomeIcon
                    icon={["fas", term.token]}
                    className="icon"
                  />
                ) : (
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                )}
              </Grid.Column>
              <Grid.Column width={5}>
                <TextWidget
                  id="token"
                  title={intl.formatMessage(messages.icon)}
                  placeholder={intl.formatMessage(messages.icon)}
                  wrapped={false}
                  description=""
                  required={true}
                  value={term.token}
                  onChange={(id, value) => onChangeTerm(index, id, value)}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <TextWidget
                  id="title"
                  title={intl.formatMessage(messages.label)}
                  placeholder={intl.formatMessage(messages.label)}
                  wrapped={false}
                  description=""
                  required={true}
                  value={term.title}
                  onChange={(id, value) => onChangeTerm(index, id, value)}
                />
              </Grid.Column>
              <Grid.Column width={1} className="term-actions">
                <Button
                  icon="trash"
                  negative
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteTerm(index);
                  }}
                  className="delete-term"
                  title={intl.formatMessage(messages.deleteButton)}
                  size="mini"
                />
              </Grid.Column>
            </Grid.Row>
          ))}
          <Grid.Row columns={1} className="bottom-buttons">
            <Grid.Column textAlign="center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addTerm();
                }}
                primary
                size="mini"
              >
                {intl.formatMessage(messages.addTerm)}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </FormFieldWrapper>
  );
};

export default VocabularyIconsWidget;
