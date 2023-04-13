import { FormatTextdirectionLToROutlined } from "@mui/icons-material";
import {
  enhancerOptionFields,
  enhancerType,
  deblurModelTypes,
  deblurOptionFields,
  stylizeOptionFields,
} from "../../../constants/image-enhancing/enhancingTypes";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField, styled, withStyles } from "@mui/material";

export const renderFields = (
  enhancerType: enhancerType,
  optionFields: enhancerOptionFields,
  setOptionFields: React.Dispatch<React.SetStateAction<enhancerOptionFields>>
): JSX.Element => {
  switch (enhancerType) {
    case "upscale":
      return <></>;
    case "deblur":
      return (
        <DeblurFields
          optionFields={optionFields}
          setOptionFields={setOptionFields}
        />
      );
    case "stylize":
      return (
        <StylizeFields
          optionFields={optionFields}
          setOptionFields={setOptionFields}
        />
      );

    default:
      return <></>;
  }
};

interface FieldProps {
  optionFields: enhancerOptionFields;
  setOptionFields: React.Dispatch<React.SetStateAction<enhancerOptionFields>>;
}

const DeblurFields = ({ optionFields, setOptionFields }: FieldProps) => {
  return (
    <FormControl sx={{ marginTop: 5, marginBottom: 5, minWidth: 120 }}>
      <InputLabel
        sx={{
          color: `rgb(253, 224, 71)`,
          "&.Mui-focused": { color: `rgb(253, 224, 91)` },
        }}
        id="demo-simple-select-filled-label"
      >
        Model
      </InputLabel>
      <Select
        variant="outlined"
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        sx={{
          color: "rgb(253, 224, 71)",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(253, 224, 71, 0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(253, 224, 71, 0.1)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(253, 224, 71, 0.4)",
          },
          ".MuiSvgIcon-root ": {
            fill: "rgb(253, 224, 71)",
          },
        }}
        //ignore ts
        value={optionFields.model as deblurOptionFields[`model`]}
        onChange={(e) =>
          setOptionFields((v) => {
            return {
              ...v,
              model: e.target.value as (typeof deblurModelTypes)[number],
            };
          })
        }
        input={<OutlinedInput label="Name" />}
      >
        {deblurModelTypes.map((modelName) => (
          <MenuItem className="text-white" key={modelName} value={modelName}>
            {modelName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const StylizeFields = ({ optionFields, setOptionFields }: FieldProps) => {
  return (
    <>
      <TextField
        sx={{
          height: 20,
          borderColor: "white",
          ":focus": {
            border: "1px solid green",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "orange",
            },
          },
        }}
        InputLabelProps={{
          style: {
            color: "rgb(254,202,202)",
            marginLeft: 20,
            borderColor: "white",
          },
        }}
        color="warning"
        inputProps={{
          style: { color: "rgb(254,202,202)", marginLeft: 20 },
        }}
        id="standard-basic"
        className=" my-2 h-12 w-full rounded-md !text-white  outline-none   transition-all duration-300 placeholder:text-red-500  focus:border-transparent  focus:outline-none  focus:ring-0"
        label="Prompt"
        variant="standard"
        value={optionFields.text as stylizeOptionFields["text"]}
        onChange={(e) =>
          setOptionFields((v) => {
            return { ...v, text: e.target.value };
          })
        }
      />
    </>
  );
};
