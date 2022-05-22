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
import twoTail from "././data/twoTail.json";
import { BellCurve } from "./components/BellCurve";

export const HomePage = () => {
  const validationSchema = Yup.object().shape({
    ho: Yup.string().required("Requerido"),
    hi: Yup.string().required("Requerido"),
    nameColumn_0: Yup.string().required("Requerido"),
    nameColumn_1: Yup.string().required("Requerido"),
    nameColumn_2: Yup.string().required("Requerido"),
    rows: Yup.array().of(
      Yup.object().shape({
        row_1: Yup.number().required("Requerido"),
        row_2: Yup.number().required("Requerido"),
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
          <Typography variant="h6" gutterBottom align="center">
            POYECTO FINAL
          </Typography>

          <Typography variant="h5" gutterBottom align="center">
            Yony Alexander Poncio Solis - 1490-18-15741
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            INGA: Maria Del Milagro Diaz Rodriguez
          </Typography>
        </Card>
        <Card style={{ marginTop: "35px", padding: "25px" }}>
          <Formik
            initialValues={{
              ho: "",
              hi: "",
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

              //*********************************************************

              setIsVisible(true);

              //*********************************************************

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

              //*********************************************************

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

              //*********************************************************
              const n = values.rows.length;
              const gdl = n - 1;
              const d = res.suma1 / n;

              const sd = Math.sqrt(
                (res.suma2 - Math.pow(res.suma1, 2) / n) / (n - 1)
              );

              const tt = Math.round((d / (sd / Math.sqrt(n))) * 100) / 100;

              setResults((results: any) => ({
                ...results,
                tt,
              }));

              if (values.tails === "1") {
                const findSign: any = oneTail.find(
                  (val) => val.value === gdl.toString()
                );
                const t = findSign[values.levelSignificance];

                setResults((results: any) => ({
                  ...results,
                  t,
                }));
              } else {
                const findSign: any = twoTail.find(
                  (val) => val.value === gdl.toString()
                );
                const t = findSign[values.levelSignificance];

                setResults((results: any) => ({
                  ...results,
                  t,
                }));
              }
            }}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form noValidate autoComplete="off">
                <Typography variant="h4" gutterBottom align="center">
                  Pruebas de hipotesis para medias: muestras dependientes
                </Typography>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <Typography variant="h5" gutterBottom>
                  Hipotesis
                </Typography>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="start"
                  spacing={4}
                  style={{ margin: "5px" }}
                >
                  <Typography variant="body1" gutterBottom>
                    Ho: M1 - M2
                  </Typography>

                  <TextField
                    margin="normal"
                    select
                    label=""
                    name="ho"
                    value={values.ho}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ho && touched.ho)}
                    helperText={errors.ho && touched.ho && errors.ho}
                  >
                    <MenuItem value="<">{"<"}</MenuItem>
                    <MenuItem value="<=">{"<="}</MenuItem>
                    <MenuItem value=">">{">"}</MenuItem>
                    <MenuItem value=">=">{">="}</MenuItem>
                    <MenuItem value="=">{"="}</MenuItem>
                  </TextField>
                  <Typography variant="body1" gutterBottom>
                    0
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="start"
                  spacing={4}
                  style={{ margin: "5px" }}
                >
                  <Typography variant="body1" gutterBottom>
                    Hi: M1 - M2
                  </Typography>

                  <TextField
                    margin="normal"
                    select
                    label=""
                    name="hi"
                    value={values.hi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.hi && touched.hi)}
                    helperText={errors.hi && touched.hi && errors.hi}
                  >
                    <MenuItem value="<">{"<"}</MenuItem>
                    <MenuItem value="<=">{"<="}</MenuItem>
                    <MenuItem value=">">{">"}</MenuItem>
                    <MenuItem value=">=">{">="}</MenuItem>
                    <MenuItem value="=">{"="}</MenuItem>
                  </TextField>
                  <Typography variant="body1" gutterBottom>
                    0
                  </Typography>
                </Stack>

                <Typography variant="h5" gutterBottom>
                  Encabezados de la tabla
                </Typography>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Columna 1"
                  name="nameColumn_0"
                  value={values.nameColumn_0}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.nameColumn_0 && touched.nameColumn_0)}
                  helperText={
                    errors.nameColumn_0 &&
                    touched.nameColumn_0 &&
                    errors.nameColumn_0
                  }
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Columna 2"
                  name="nameColumn_1"
                  value={values.nameColumn_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.nameColumn_1 && touched.nameColumn_1)}
                  helperText={
                    errors.nameColumn_1 &&
                    touched.nameColumn_1 &&
                    errors.nameColumn_1
                  }
                />

                <TextField
                  margin="normal"
                  fullWidth
                  label="Columna 3"
                  name="nameColumn_2"
                  value={values.nameColumn_2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.nameColumn_2 && touched.nameColumn_2)}
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
                  error={Boolean(errors.tails && touched.tails)}
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
                    error={Boolean(
                      errors.levelSignificance && touched.levelSignificance
                    )}
                    helperText={
                      errors.levelSignificance &&
                      touched.levelSignificance &&
                      errors.levelSignificance
                    }
                  >
                    <MenuItem value="0.250">0.250</MenuItem>
                    <MenuItem value="0.125">0.125</MenuItem>
                    <MenuItem value="0.100">0.100</MenuItem>
                    <MenuItem value="0.050">0.050</MenuItem>
                    <MenuItem value="0.025">0.025</MenuItem>
                    <MenuItem value="0.013">0.013</MenuItem>
                    <MenuItem value="0.010">0.010</MenuItem>
                    <MenuItem value="0.005">0.005</MenuItem>
                    <MenuItem value="0.003">0.003</MenuItem>
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
                    error={Boolean(
                      errors.levelSignificance && touched.levelSignificance
                    )}
                    helperText={
                      errors.levelSignificance &&
                      touched.levelSignificance &&
                      errors.levelSignificance
                    }
                  >
                    <MenuItem value="0.500">0.500</MenuItem>
                    <MenuItem value="0.250">0.250</MenuItem>
                    <MenuItem value="0.200">0.200</MenuItem>
                    <MenuItem value="0.100">0.100</MenuItem>
                    <MenuItem value="0.050">0.050</MenuItem>
                    <MenuItem value="0.025">0.025</MenuItem>
                    <MenuItem value="0.020">0.020</MenuItem>
                    <MenuItem value="0.010">0.010</MenuItem>
                    <MenuItem value="0.005">0.005</MenuItem>
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
                              label="Valor 1"
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
                              label="Valor 2"
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
                        Agregar
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
                  Calcular
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

            <Typography variant="subtitle1" gutterBottom>
              {`Suma de diferencias: ${results.suma1}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {`Suma de cuadrados: ${results.suma2}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {`Grados de libertad: ${tableData.length - 1}`}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {`t: ${results.t}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {`Respuesta t: ${results.tt}`}
            </Typography>

            <BellCurve resultado={results.tt} significancia={results.t} />

            <Button
              color="primary"
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Nuevo
            </Button>
          </Card>
        )}
      </Container>
    </Layout>
  );
};
