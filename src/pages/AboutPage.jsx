import { useForm } from "react-hook-form";
import {
  FileInput,
  Checkbox,
  Button,
  Label,
  Spinner,
  Select,
  Radio,
} from "flowbite-react";
import { useInsert, useList } from "../hooks/database";

export function AboutPage() {
  return (
    <div>
     <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="text-xl font-text-center my-4">About Us</div>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        nulla ex, fermentum in ex quis, suscipit gravida quam. Fusce rutrum
        metus dolor, at dapibus turpis gravida et. In mattis blandit finibus.
        Ut at augue eget nisl eleifend dignissim. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos. 
        Etiam egestas lectus ex, a vestibulum metus eleifend a. Proin in 
        vestibulum ex, vitae lacinia augue. Aliquam dui nibh, tincidunt
        lacinia mattis vitae, suscipit a augue. Aliquam egestas ullamcorper 
        dictum. Nam iaculis magna mauris, id ullamcorper turpis mattis 
        iaculis. Donec feugiat dolor nec ex varius, quis pulvinar nunc 
        mattis. Suspendisse pellentesque, arcu in luctus iaculis, tellus 
        arcu tincidunt velit, volutpat tristique massa ipsum non purus.
        </div>
      </div>
    </div>  
  );
}
