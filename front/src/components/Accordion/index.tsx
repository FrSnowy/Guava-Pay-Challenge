import * as React from 'react';
import styles from './styles.module.pcss';
import { Accordion as SemanticAccordion, Icon } from 'semantic-ui-react';

type AccordionProps = {
  name: string;
  resetIcon?: React.ReactNode;
  defaultVisibility?: boolean;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  name,
  resetIcon,
  defaultVisibility,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(
    !!defaultVisibility
  );

  return (
    <SemanticAccordion className={styles.container}>
      <SemanticAccordion.Title
        active={isVisible}
        onClick={() => setIsVisible(!isVisible)}
      >
        <Icon name='dropdown' />
        {name}
      </SemanticAccordion.Title>
      <SemanticAccordion.Content active={isVisible}>
        {children}
      </SemanticAccordion.Content>
      {resetIcon}
    </SemanticAccordion>
  );
};

export default Accordion;
