import { FormatTextdirectionLToROutlined } from "@mui/icons-material";
import {
  enhancerOptionFields,
  enhancerType,
  deblurModelTypes,
  deblurOptionFields,
} from "../../../constants/image-enhancing/enhancingTypes";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

    default:
      return <></>;
  }
};

interface DeblurFieldsProps {
  optionFields: enhancerOptionFields;
  setOptionFields: React.Dispatch<React.SetStateAction<enhancerOptionFields>>;
}

const DeblurFields = ({ optionFields, setOptionFields }: DeblurFieldsProps) => {
  const select = {
    "&:before": {
      borderColor: "#fff",
    },
    "&:after": {
      borderColor: "#fff",
    },
  };

  if (optionFields === null) {
    console.log("this ran");

    setOptionFields((v) => {
      return { ...v, model: "Image Deblurring (GoPro)" };
    });
  }
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
