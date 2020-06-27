---
title: "Running Jupyter Notebook in Docker using pydockenv in 80 seconds"
date: "2019-11-04"
hackerNewsId: 21440801
description: "Pydockenv is tool to create Python virtual environments power by Docker. In this post it will be shown how to use it to run a Jupyter Notebook in 80 seconds"
---

<!--BEGIN INTRO-->
Here's a video showing how I was able to do it in 80 seconds:

<div class="row justify-content-center mb-3">
    <div class="embed-responsive embed-responsive-16by9 col-12">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/CKIxnHUx7ko" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>


Cool right? And the only tools that you'll need are `pydockenv` and `Docker` of course.

But let's proceed in order.
<!--END INTRO-->

## What is pydockenv?

`pydockenv` is a project which is currently in *alpha* stage whose goal is to give the same experience of using virtual environments, but backed by Docker. So each python environment will actually correspond to a Docker container, and can be defined by using a `.toml` file. At time of writing it's compatible only with Python >=3.6.

For our purpose, we're actually only interested in how to install it and how to create the environment that will run our Jupyter Notebook. You can have a look at the [home page of the project](https://github.com/se7entyse7en/pydockenv).

### Installation

As explained in the [README](https://github.com/se7entyse7en/pydockenv#installation) of the project, we can install `pydockenv` as follows:

```shell
pip install --user pydockenv  # or pip3, here I'm assuming that pip is for Python 3
```

The above command will install `pydockenv` to the Python user install directory to avoid conflicts. In order to run the `pydockenv` binary, you will need to have that directory in your `PATH`. You can do this by running these lines:

```shell
export PY_USER_BIN=$(python -c 'import site; print(site.USER_BASE + "/bin")')
export PATH=$PY_USER_BIN:$PATH
```

Now you have the `pydockenv` cli available!

#### Caveat

There's a little caveat: `pydockenv` assumes that the `python` binary runs Python >=3.6. In case that you have Python 3 available through `python3`, you should also run:

```shell
export PYDOCKENV_INTERPRETER=path/to/python-3-binary/python3
```

## A look into the .toml file

As anticipated above, an environment can be defined using `.toml` file, that we will save as `jupyter-notebook-env.toml`. Here's its content:

```toml
[tool.pydockenv]
name = "jupyter-notebook"
python = "3.7.4"

[tool.pydockenv.dependencies]
jupyter = "==1.0.0"

[tool.pydockenv.aliases]

[tool.pydockenv.aliases.notebook]
cmd = "jupyter notebook --allow-root --ip=0.0.0.0 --port=8888"
ports = [8888]
```

If you're like: *"Hey! Just let me run my Notebook!"*, then skip to the section ["Let's run the Jupyter Notebook!"](#lets-run-the-jupyter-notebook), otherwise stay here to understand how the environment is defined.

### A deeper dive into the .toml file

The first part it's actually almost self-explanatory:

```toml
[tool.pydockenv]
name = "jupyter-notebook"
python = "3.7.4"
```

This simply means that the name of the environment will be `"jupyter-notebook-pydockenv"` and that the correspdonding container will run Python 3.7.4.

The second part it's a sort of `requirements.txt` embedded into the this file. This simply lists all the requirements that will be installed inside the container:

```toml
[tool.pydockenv.dependencies]
jupyter = "==1.0.0"
```

In this case `jupyter==1.0.0` is our only requirement.

Since the environment actually runs in a Docker container, this means that also all the commands will run inside that container. As you most probably know, to run a command insde a docker container you need to run:

```shell
docker exec -it run <container-name> <command>
```

and let's face it, it's not the most convenient thing to do.

So the third part simply defines an alias for running the Notebook:

```toml
[tool.pydockenv.aliases]

[tool.pydockenv.aliases.notebook]
cmd = "jupyter notebook --allow-root --ip=0.0.0.0 --port=8888"
ports = [8888]
```

Here an alias `notebook` is defined, and by running `pydockenv run notebook` we will actually run inside the container the command specified by `cmd`. The `ports` key is just a list of ports that the command requires to be opened on the container. If we do not open the specific port the Notebook will run, but it won't be accessible from the host.

## Let's run the Jupyter Notebook!

And here we are!

Let's say that your project directory from where you want to run the Jupyter Notebook is in `~/Projects/awesome-project` and that you already put the `jupyter-notebook-env.toml` inside. We have to create the environment from that directory:

```shell
cd ~/Projects/awesome-project
pydockenv create --file=jupyter-notebook-env.toml .
```

Now, especially if you're used to virtual environments, you may ask: *"Why the environment should bother about the directory from which I create it?"*. Well, that is because it runs in a Docker container, and what `pydockenv` does is to bind mount the project directory into the container. To be more specific it binds it into `/usr/src`.

The environment has been created! Let's activate it!

```shell
source pydockenv activate jupyter-notebook
```

And we can now finally start our Notebook:

```shell
pydockenv run notebook
```

## Conclusions

`pydockenv` is still at its beginning, but I'm actively working on it as I think that it has a lot of potential. If you liked it, don't forget to leave a :star2: on [Github](https://github.com/se7entyse7en/pydockenv) and contributions are welcome! If you have ideas or find any issue, please leave a comment or [open an issue](https://github.com/se7entyse7en/pydockenv/issues).
