import { FieldArray, Form, Formik, getIn } from "formik";
import {
  Divider,
  Button,
  TextField,
  Card,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  MenuItem,
} from "@mui/material";
import { Layout } from "./components/Layout";
import * as Yup from "yup";
import { Container } from "@mui/system";
import { useState } from "react";
import oneTail from "././data/oneTail.json";

export const HomePage = () => {
  //console.log(oneTail);
  const validationSchema = Yup.object().shape({
    nameColumn_0: Yup.string().required("Requerido"),
    nameColumn_1: Yup.string().required("Requerido"),
    nameColumn_2: Yup.string().required("Requerido"),
    rows: Yup.array().of(
      Yup.object().shape({
        row_1: Yup.number().required("First name is required"),
        row_2: Yup.number().required("Last name is required"),
      })
    ),
    tails: Yup.string().required("Requerido"),
    levelSignificance: Yup.string().required("Requerido"),
  });

  const [isVisible, setIsVisible] = useState(false);
  const [tableTitles, setTableTitles] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [results, setResults] = useState<any>({});

  return (
    <Layout>
      <Container component="main" maxWidth="md">
        <Card style={{ marginTop: "35px", padding: "25px" }}>
          <Formik
            initialValues={{
              nameColumn_0: "",
              nameColumn_1: "",
              nameColumn_2: "",
              tails: "",
              levelSignificance: "",
              rows: [
                {
                  id: Math.random(),
                  row_1: "",
                  row_2: "",
                },
              ],
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              setIsVisible(true);

              const tableValues = values.rows.map((value, index) => {
                return {
                  row_0: index + 1,
                  ...value,
                  row_3: Number(value.row_1) - Number(value.row_2),
                  row_4: Math.pow(Number(value.row_1) - Number(value.row_2), 2),
                };
              });

              const titles = [
                values.nameColumn_0,
                values.nameColumn_1,
                values.nameColumn_2,
                "Diferencia",
                "Cuadrado",
              ];

              setTableTitles(titles);
              setTableData(tableValues);

              function sumArray() {
                let sum1 = 0;
                let sum2 = 0;

                tableValues.map((row: any) => {
                  sum1 += row.row_3;
                  sum2 += row.row_4;
                });

                return {
                  suma1: sum1,
                  suma2: sum2,
                };
              }

              const res = sumArray();

              setResults(res);
            }}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form noValidate autoComplete="off">
                <Typography variant="h5" gutterBottom>
                  Encabezados de la tabla
                </Typography>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Correo"
                  name="nameColumn_0"
                  value={values.nameColumn_0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.nameColumn_0 &&
                    touched.nameColumn_0 &&
                    errors.nameColumn_0
                  }
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Correo"
                  name="nameColumn_1"
                  value={values.nameColumn_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.nameColumn_1 &&
                    touched.nameColumn_1 &&
                    errors.nameColumn_1
                  }
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Correo"
                  name="nameColumn_2"
                  value={values.nameColumn_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.nameColumn_2 &&
                    touched.nameColumn_2 &&
                    errors.nameColumn_2
                  }
                />

                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Typography variant="h5" gutterBottom>
                  Nivel de significancia
                </Typography>

                <TextField
                  margin="normal"
                  select
                  fullWidth
                  label="Colas"
                  name="tails"
                  value={values.tails}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.tails && touched.tails && errors.tails}
                >
                  <MenuItem value="1">Una Cola</MenuItem>
                  <MenuItem value="2">Dos Colas</MenuItem>
                </TextField>

                {values.tails === "1" ? (
                  <TextField
                    margin="normal"
                    select
                    fullWidth
                    label="Nivel de significancia"
                    name="levelSignificance"
                    value={values.levelSignificance}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.levelSignificance &&
                      touched.levelSignificance &&
                      errors.levelSignificance
                    }
                  >
                    <MenuItem value="0.05">0.05</MenuItem>
                    <MenuItem value="0.025">0.025</MenuItem>
                    <MenuItem value="0.01">0.01</MenuItem>
                    <MenuItem value="0.005">0.005</MenuItem>
                    <MenuItem value="0.0025">0.0025</MenuItem>
                    <MenuItem value="0.001">0.001</MenuItem>
                    <MenuItem value="0.0005">0.0005</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    margin="normal"
                    select
                    fullWidth
                    label="Nivel de significancia"
                    name="levelSignificance"
                    value={values.levelSignificance}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.levelSignificance &&
                      touched.levelSignificance &&
                      errors.levelSignificance
                    }
                  >
                    <MenuItem value="0.05">FERR</MenuItem>
                    <MenuItem value="0.025">0.025</MenuItem>
                    <MenuItem value="0.01">0.01</MenuItem>
                    <MenuItem value="0.005">0.005</MenuItem>
                    <MenuItem value="0.0025">0.0025</MenuItem>
                    <MenuItem value="0.001">0.001</MenuItem>
                    <MenuItem value="0.0005">0.0005</MenuItem>
                  </TextField>
                )}

                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Typography variant="h5" gutterBottom>
                  Ingrese los valores
                </Typography>

                <FieldArray name="rows">
                  {({ push, remove }) => (
                    <div>
                      {values.rows.map((p, index) => {
                        const row_1 = `rows[${index}].row_1`;
                        const touchedRow_1 = getIn(touched, row_1);
                        const errorRow_1 = getIn(errors, row_1);

                        const row_2 = `rows[${index}].row_2`;
                        const touchedRow_2 = getIn(touched, row_2);
                        const errorRow_2 = getIn(errors, row_2);

                        return (
                          <Stack
                            key={p.id}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                            style={{ margin: "20px" }}
                          >
                            <TextField
                              fullWidth
                              label="First name"
                              name={row_1}
                              value={p.row_1}
                              type="number"
                              helperText={
                                touchedRow_1 && errorRow_1 ? errorRow_1 : ""
                              }
                              error={Boolean(touchedRow_1 && errorRow_1)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <TextField
                              fullWidth
                              label="Last name"
                              name={row_2}
                              value={p.row_2}
                              type="number"
                              helperText={
                                touchedRow_2 && errorRow_2 ? errorRow_2 : ""
                              }
                              error={Boolean(touchedRow_2 && errorRow_2)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Button
                              type="button"
                              color="secondary"
                              variant="outlined"
                              size="small"
                              disabled={values.rows.length === 1}
                              onClick={() => remove(index)}
                            >
                              x
                            </Button>
                          </Stack>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() =>
                          push({ id: Math.random(), row_1: "", row_2: "" })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  // disabled={!isValid || values.people.length === 0}
                >
                  submit
                </Button>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              </Form>
            )}
          </Formik>
        </Card>

        {isVisible && (
          <Card style={{ padding: "25px", margin: "25px 0" }}>
            <Typography variant="h5" gutterBottom>
              Resultados
            </Typography>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {tableTitles.map((title: string, index: number) => (
                      <TableCell key={index} align="right">
                        {title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.row_0}</TableCell>
                      <TableCell align="right">{row.row_1}</TableCell>
                      <TableCell align="right">{row.row_2}</TableCell>
                      <TableCell align="right">{row.row_3}</TableCell>
                      <TableCell align="right">{row.row_4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" gutterBottom>
              {`Suma de diferencias: ${results.suma1}`}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {`Suma de cuadrados: ${results.suma2}`}
            </Typography>
          </Card>
        )}
      </Container>
    </Layout>
  );
};
