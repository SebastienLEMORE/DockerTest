FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
RUN pip install pipenv
COPY Pipfile* /app/
RUN cd /app && pipenv lock --keep-outdated --requirements > requirements.txt
RUN pip install -r /app/requirements.txt
