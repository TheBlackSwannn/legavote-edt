export type FieldProps = {
  name: string;
};

export const StandardField = (props: FieldProps) => {
  return <li>{props.name}</li>;
};

export const PrimaryKeyField = (props: FieldProps) => {
  return <li className="underline">{props.name}</li>;
};

export const ForeignKeyField = (props: FieldProps) => {
  return <li className="italic">#{props.name}</li>;
};
